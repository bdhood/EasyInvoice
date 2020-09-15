FROM python:3.7

ENV PROJECT_DIR /tests/acceptance
WORKDIR ${PROJECT_DIR}
RUN mkdir -p ${PROJECT_DIR}

RUN pip install pipenv

COPY Pipfile Pipfile.lock ./

RUN pipenv install

COPY entrypoint.sh wait-for-http.sh .pylintrc ./
COPY tests ./tests
