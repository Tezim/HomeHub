import paths


class UserDTO():
    id = 0
    photo = ""
    name = ""
    email = ""
    phone = ""
    twoF = ""
    groups = ""

    def __init__(self, user):
        self.photo = user.photo
        self.id = user.user_id
        self.name = user.name
        self.email = user.email
        self.phone = user.phone
        self.twoF = user.two_factor
        self.groups = user.goups

    def to_json(self):
        return {
            "id": self.id,
            "username": self.name,
            "email": self.email,
            "phone": self.phone,
            "twoF_enabled": self.twoF,
            "groups": self.groups,
            "photo": self.photo
        }
