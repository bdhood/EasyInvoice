from time import sleep
import os

def login(settings, driver):

    driver.get(settings.base_url + '/?no-render')

    dir = os.path.dirname(os.path.realpath(__file__))

    with open(os.path.join(dir, 'static/jquery-3.5.1.min.js'), errors='ignore') as f:
        driver.execute_script(f.read())

    with open(os.path.join(dir, 'static/login.js'), errors='ignore') as f:
        driver.execute_script(f.read())

    driver.get(settings.base_url)
