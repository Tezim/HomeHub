## Requirements
>pip install flask
> 
>pip install tinydb

Copy app_data_public.py values into app_data.py and fill in your paths

**do not commit app_data.py and databases (db.json) !!!**

### Flask start server
- run server as development - run wsgi.py file main or "flask run" in terminal (localhost:5000)
- run server visible for current network - run api_handle.py file main (host_ip:3000) 3000 for default react port *not recommended yet

### Test endpoints:
< ip : port >

**/**  -> default path : outputs content based on database connection status

**/login** -> void page