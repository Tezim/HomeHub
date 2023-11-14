class RoomDTO():
    room_id = 0
    name = ""
    story = 0
    size = 0
    devices = []


    def __init__(self, room):
        self.room_id = room.room_id
        self.name = room.name
        self.story = room.story
        self.size = room.size
        self.devices = room.devices

    def to_json(self):
        return {
            "room_id": self.room_id,
            "name": self.name,
            "story": self.story,
            "size": self.size,
            "devices": list(self.devices)
        }