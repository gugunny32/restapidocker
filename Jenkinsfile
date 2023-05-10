pipeline {
  agent any
  stages {
    stage('build') {
      parallel {
        stage('build') {
          steps {
            sh 'docker compose up'
          }
        }

        stage('') {
          steps {
            echo 'Build Stage'
          }
        }

      }
    }

    stage('test') {
      steps {
        echo 'test'
      }
    }

    stage('deploy') {
      steps {
        echo 'deployed'
      }
    }

  }
}