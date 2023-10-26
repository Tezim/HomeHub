import hashlib

from backend.app_config import PEPPER


def pwd_hash_check(pwd, expected):
    pwd += PEPPER
    m = hashlib.sha256(pwd.encode('UTF-8'))
    if m.hexdigest() == expected:
        return True
    return False


def pwd_hash(pwd):
    pwd += PEPPER
    m = hashlib.sha256(pwd.encode('UTF-8'))
    return m.hexdigest()
