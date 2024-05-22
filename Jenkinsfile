pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                bat 'docker-compose up --build' 
            }
        }
       
    }
}