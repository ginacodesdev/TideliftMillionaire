pipeline {
    agent any
   environment {
// Always store API keys in Jenkins credential store
// ORG key should be either an Organization API key or Project API key
        TIDELIFT_API_KEY = credentials('my-tidelift-project-api-key')
// These are needed to run alignments and also to create the project. Ideally these are read from
// configuration in Jenkins or from local metadata stored in the repository being checked out. Test.
      TIDELIFT_PROJECT_NAME = 'TideliftMillionaire'
      TIDELIFT_ORGANIZATION = 'team/Tidelift-252d'
      TIDELIFT_CATALOG = 'Gina-Tidelift-Catalog-Walkthrough'
    }
    stages {
        stage ('Download CLI') {
            steps {
                sh 'curl -s -o ./tidelift https://download.tidelift.com/cli/tidelift'
                  sh 'chmod +x ./tidelift'
            }
            
          stage('Running Tidelift Alignment') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                      sh "./tidelift alignment save --wait --project ${TIDELIFT_PROJECT_NAME} --organization ${TIDELIFT_ORGANIZATION} --catalog ${TIDELIFT_CATALOG}"
               }
            }
          }
}
