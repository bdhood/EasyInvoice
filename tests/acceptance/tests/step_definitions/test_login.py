"""
Step definitions for login.feature
"""

import json

from pytest_bdd import scenarios, given, then, when, parsers

from ..interactions.base.element import element_search
from ..interactions.base.control import control_click, control_text

scenarios('../features/login.feature')

@given('I am on the login screen')
def given_i_am_on_the_login_screen(context):
    context.driver.get(context.settings.base_url)

@when(parsers.parse('I enter email \"{email}\"'))
def when_i_enter_email(context, email):
    control_text(context.driver, 'Email', email)

@when(parsers.parse('I enter password \"{password}\"'))
def when_i_enter_password(context, password):
    control_text(context.driver, 'Password', password)

@when('I click login')
def when_i_click_login(context):
    control_click(context.driver, 'Login', index=1)

@when("I click logout")
def when_i_click_remove(context):
    control_click(context.driver, 'dropdown-basic')
    control_click(context.driver, 'Logout')