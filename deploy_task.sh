
JQ="jq --raw-output --exit-status"

register_task(){
    echo $AWS_TASK_FILE
    if revision=$(aws ecs register-task-definition --cli-input-json $AWS_TASK_FILE | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task def"
    fi
}

deploy_task() {
    register_task
    if [[ $(aws ecs update-service --cluster $AWS_CLUSTER_NAME --service $AWS_SERVICE_NAME --task-definition $revision | $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service"
    else
        echo "Deployment in progress?"
    fi
}

deploy_task
