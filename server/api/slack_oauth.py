import jwt
from os import environ
from base64 import b64decode

from .models import AndelaUserProfile, UserProxy

def generate_token(payload):

    private_key64 = environ.get('TEST_PUBLIC_KEY')
    print(private_key64)
    private_key = b64decode(private_key64).decode('utf-8')

    token = jwt.encode(payload, private_key, algorithm='RS256',)
    return token

def get_or_create_user(request, api_data):
    if api_data['ok']:
        user_data = api_data['user']
        email_split = user_data['email'].split('@')
        user_data['username'] = email_split[0]
        first_name, last_name = email_split[0].split('.')
        user_data['first_name'] = first_name.capitalize()
        user_data['last_name'] = last_name.capitalize()

        try:
            user = UserProxy.get_user(user_data)
        except UserProxy.DoesNotExist:
            user = UserProxy.create_user(user_data)
        try:
            AndelaUserProfile.get_and_update_user_profile(user_data, slack_auth=True)
        except AndelaUserProfile.DoesNotExist:
            AndelaUserProfile.create_user_profile(user_data, user.id, slack_auth=True)

        payload = dict(
            UserInfo=dict(
                id=user_data['id'],
                email= user_data['email'],
                first_name=user_data['first_name'],
                last_name=user_data['last_name'],
                picture=user_data['image_72'],
            ),
            aud='andela.com'
        )

        request.token = generate_token(payload)

    return request, api_data 
    