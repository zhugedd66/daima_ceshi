



class BaseResponse(object):
    def __init__(self):
        self.code=1000
        self.msg=""
        self.data=None
    @property
    def dict(self):  # property直接通过方法名访问 只能进行读
        return self.__dict__


