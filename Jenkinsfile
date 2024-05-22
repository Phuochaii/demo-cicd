pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                bat 'npm install'
            }
        }
        stage('Unit Testing') { 
            steps {
                bat 'npm run test:cov'
            }
        }
        stage('E2E Testing') { 
            steps {
                bat 'npm run test:e2e'
            }
        }

       
    }
}