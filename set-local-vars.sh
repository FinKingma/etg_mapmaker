export PACTBROKERURL=http://etg-balancer-862594806.eu-central-1.elb.amazonaws.com:8000
export PACTBROKERURL=http://localhost:8080
export PACTBROKERURL=https://xebia.pact.dius.com.au/
export AWS_ACCOUNT_ID=636301108823
export CIRCLE_SHA1=1234
export TAG=dev
export CIRCLE_TEST_REPORTS=temp

docker run -d -e "HOME=/home" -v $HOME/.aws:/home/.aws -p 3000:3000 --name mapmaker $AWS_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com/mapmaker:$CIRCLE_SHA1; sleep 3