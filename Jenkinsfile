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
        // stage('E2E Testing') { 
        //     steps {
        //         bat 'npm run test:e2e'
        //     }
        // }
    
    }
    post {
    success {
        echo 'SUCCESS'
    }
    failure {
        echo 'FAILURE'
    }
}
}

