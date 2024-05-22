pipeline {
    agent any

    tools {nodejs "node"}

    stages {

        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm run test'
            }
        }
    }
}