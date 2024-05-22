pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
            //  cca
        }
        stage('Unit Testing') { 
            steps {
                bat 'npm run test:cov'
            }
        }
    
    }
}