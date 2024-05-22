pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                bat 'npm install -g pnpm' 
                bat 'pnpm install'
            }
        }
       
    }
}