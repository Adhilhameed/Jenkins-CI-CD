pipeline {
    agent any

    environment {
        IMAGE     = 'jenkins-demo-app'
        CONTAINER = 'jenkins-demo-app'
    }

    triggers {
        pollSCM('H/2 * * * *')
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE:$BUILD_NUMBER -t $IMAGE:latest .'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm $IMAGE:$BUILD_NUMBER npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                  docker rm -f $CONTAINER || true
                  docker run -d --name $CONTAINER -p 3001:3000 $IMAGE:$BUILD_NUMBER
                '''
            }
        }
    }

    post {
        success { echo 'Pipeline succeeded. App is live on port 3001.' }
        failure { echo 'Pipeline failed. Check the console output.' }
    }
}
