"""
Step definitions for login.feature
"""

import json

from pytest_bdd import scenarios, given, then, when, parsers

from ..interactions.base.element import element_search
from ..interactions.base.control import control_click, control_text

scenarios('../features/register.feature')

@given('I am on the register screen')
def given_i_am_on_the_register_screen(context):
    context.driver.get(context.settings.base_url)
    control_click(context.driver, "Register")

@when(parsers.parse('I enter name \"{name}\"'))
def when_i_enter_name(context, name):
    control_text(context.driver, 'register_name', name)

@when('I enter the randomized email')
def when_i_enter_a_randomized_email(context):
    control_text(context.driver, 'Email', context.settings.random_email)

@when(parsers.parse('I enter phone number \"{phone}\"'))
def when_i_enter_phone_number(context, phone):
    control_text(context.driver, 'register_phone', phone)

@when(parsers.parse('I enter billing address \"{address}\"'))
def when_i_enter_billing_address(context, address):
    control_text(context.driver, 'register_address', address)

@when(parsers.parse('I enter company name \"{name}\"'))
def when_i_enter_company_name(context, name):
    control_text(context.driver, 'Company Name', name)

@when(parsers.parse('I enter company address \"{address}\"'))
def when_i_enter_company_address(context, address):
    control_text(context.driver, 'register_company_address', address)

@when(parsers.parse('I enter password \"{password}\"'))
def when_i_enter_password(context, password):
    control_text(context.driver, 'Password', password)

@when('I click create')
def when_i_click_create(context):
    control_click(context.driver, 'Create')

@when('I click login')
def when_i_click_login(context):
    control_click(context.driver, 'Login', index=1)
