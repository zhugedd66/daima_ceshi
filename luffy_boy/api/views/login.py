from django.contrib import auth
from api.models import Token, UserInfo
from rest_framework.response import Response
from rest_framework.viewsets import ViewSetMixin
from api.utils.serializer import UserInfoSerializer
from rest_framework.viewsets import generics
from rest_framework.views import APIView
import binascii
import os
from api.utils.response import BaseResponse
from api.utils.captcha_verify import verify

class LoginView(APIView):
    def generate_key(self):  # binascii.hexlify()转化为十六进制
        return binascii.hexlify(os.urandom(20)).decode()

    def post(self, request):
        response = BaseResponse()

        receive = request.data
        if request.method == 'POST':
            print(receive)
            is_valid = verify(receive)
            print("is_valid", is_valid)
            if is_valid:

                username = receive.get("username")
                password = receive.get("password")
                user = auth.authenticate(username=username, password=password)
                if user is not None:
                    # update the token
                    key = self.generate_key()
                    from django.utils.timezone import utc
                    import datetime
                    now = datetime.datetime.now()
                    Token.objects.update_or_create(user=user, defaults={"key": key, "created": now})  # update_or_create 会根据传入的数据和数据库中比较如果对的上将会更新数据库中的defaults中内容
                    user_info = UserInfo.objects.get(pk=user.pk)
                    serializer = UserInfoSerializer(user_info)
                    data = serializer.data

                    response.msg = "验证成功!"
                    response.userinfo = data
                    response.token = key

                else:
                    try:
                        UserInfo.objects.get(username=username)
                        response.msg = "密码错误!"
                        response.code = 1002
                    except UserInfo.DoesNotExist:
                        response.msg = "用户不存在!"
                        response.code = 1003
            else:

                response.code = 1001
                response.msg = "请完成滑动验证!"

            return Response(response.dict)
