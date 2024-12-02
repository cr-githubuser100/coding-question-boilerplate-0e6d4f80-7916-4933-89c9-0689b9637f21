_#!/bin/bash
export CHROME_BIN=/usr/bin/chromium
if [ ! -d "/home/coder/project/workspace/angularapp" ]
then
    cp -r /home/coder/project/workspace/karma/angularapp /home/coder/project/workspace/;
fi

if [ -d "/home/coder/project/workspace/angularapp" ]
then
    echo "project folder present"
    cp /home/coder/project/workspace/karma/karma.conf.js /home/coder/project/workspace/angularapp/karma.conf.js;

    # checking for survey-form.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/survey-form" ]
    then
        cp /home/coder/project/workspace/karma/survey-form.component.spec.ts /home/coder/project/workspace/angularapp/src/app/survey-form/survey-form.component.spec.ts;
    else
    echo "week4_day2_should_create_SurveyFormComponent FAILED";
    echo "week4_day3_should_show_the_form_in_add_mode_with_the_correct_title_and_button_text FAILED";
	echo "week4_day3_should_show_the_form_in_edit_mode_with_the_correct_title_and_button_text FAILED";
	echo "week4_day3_should_display_the_correct_form_title FAILED";
	echo "week4_day3_should_bind_the_title_input_field_correctly FAILED";
    echo "week4_day3_should_bind_the_description_input_field_correctly FAILED";

    fi

    # checking for survey-list.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/survey-list" ]
    then
        cp /home/coder/project/workspace/karma/survey-list.component.spec.ts /home/coder/project/workspace/angularapp/src/app/survey-list/survey-list.component.spec.ts;
    else
    echo "week4_day2_should_create_SurveyListComponent FAILED";

    fi

     # checking for surveyService.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/services" ]
    then
        cp /home/coder/project/workspace/karma/survey.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/survey.service.spec.ts;
    else
    echo "week4_day4_should_create_the_survey_service FAILED";
    echo "week4_day4_should_retrieve_all_surveys_from_the_API_via_GET FAILED";
    echo "week4_day4_should_create_a_new_survey_via_POST FAILED";
    echo "week4_day4_should_delete_a_survey_via_DELETE FAILED";

    fi

    if [ -d "/home/coder/project/workspace/angularapp/node_modules" ]; 
    then
        cd /home/coder/project/workspace/angularapp/
        npm test;
    else
        cd /home/coder/project/workspace/angularapp/
        yes | npm install
        npm test
    fi 
else   
    echo "week4_day2_should_create_SurveyFormComponent FAILED";
    echo "week4_day3_should_show_the_form_in_add_mode_with_the_correct_title_and_button_text FAILED";
	echo "week4_day3_should_show_the_form_in_edit_mode_with_the_correct_title_and_button_text FAILED";
	echo "week4_day3_should_display_the_correct_form_title FAILED";
	echo "week4_day3_should_bind_the_title_input_field_correctly FAILED";
    echo "week4_day3_should_bind_the_description_input_field_correctly FAILED";
	echo "week4_day2_should_create_SurveyListComponent FAILED";
    echo "week4_day4_should_create_the_survey_service FAILED";
    echo "week4_day4_should_retrieve_all_surveys_from_the_API_via_GET FAILED";
    echo "week4_day4_should_create_a_new_survey_via_POST FAILED";
    echo "week4_day4_should_delete_a_survey_via_DELETE FAILED";

 
   fi
