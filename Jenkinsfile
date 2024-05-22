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
                bat 'npm test:cov'
            }
        }
        stage('E2E Testing') { 
            steps {
                bat 'npm test:e2e'
            }
        }
        
       
    }
}