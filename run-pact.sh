#get url from pact-broker
aws configure set default.region us-east-1
pbport=$(aws ecs describe-task-definition --task-definition pactbroker-family --query 'taskDefinition.containerDefinitions[0].portMappings[0].hostPort')
pburl=$(aws ec2 describe-instances --instance-id i-0dc83ba1d1519c715 --query "Reservations[0].Instances[0].PublicIpAddress" | tr -d '"')
export PACTBROKERURL=http://$pburl:$pbport
echo pactbroker located on: \'$PACTBROKERURL\'

#Run pact
./node_modules/.bin/mocha pacts/mapmaker.spec.js