'''
Imports all @pytest.fixture(s) so they are availible globally
'''

# pylint: disable=unused-import
from .support.settings import settings
from .support.driver import driver
from .support.context import context
from .support.login import login

from .interactions.base.element import element_search 

from time import sleep
from pytest_bdd import scenarios, given, then, when, parsers
import json

@given('I am on the items screen')
def given_i_am_on_the_items_screen(context):
    login(context.settings, context.driver)

# assert that a given list of strings is visible on the current page
# ex. I see text ["firstSearch", "secondSearch"]
@then(parsers.parse('I see text {search}'))
def then_i_see_text(context, search):
    searches = json.loads(search)
    for phrase in searches:
        assert element_search(context.driver, phrase) != None

@then(parsers.parse('I do not see text {search}'))
def then_i_do_not_see_text(context, search):
    searches = json.loads(search)
    for phrase in searches:
        assert element_search(context.driver, phrase, retry=1) == None

@then(parsers.parse('I see alert "{text}"'))
def then_i_see_alert(context, text):
    retry = 10
    while retry > 0:
        retry -= 1
        try:
            assert context.driver.switch_to.alert.text == text
            return
        except:
            sleep(1)
    assert context.driver.switch_to.alert.text == text