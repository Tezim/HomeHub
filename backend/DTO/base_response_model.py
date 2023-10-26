class BaseResponse():
    status = ""
    description = ""
    user = None

    def to_json(self):
        return {
            "status": self.status,
            "description": self.description,
            "user": self.user.to_json()
        }
