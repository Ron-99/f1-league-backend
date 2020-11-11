pipeline {
    agent any

    tools {
        nodejs 'Node'
    }


    stages {
        stage('Pulling Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/Ron-99/f1-league-backend.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm i'
            }
        }
        stage('Enter workspace'){
            step{
                sh 'cd $WORKSPACE'
            }
        }
    }

    

    // stage('SonarQube'){
    //     environment {
    //         scannerHome = tool name:'SonarQubeScanner'
    //         }
    //     steps {
    //         withSonarQubeEnv('Sonar') {
    //         sh "${scannerHome}/bin/sonar-scanner"
    //               }
    //            }
    //         }


    //     stage('Build') {
    //         steps {
    //             sh 'mvn install package -DskipITs'

    //                 }
    //             }

    //     stage('Unity Tests') {
    //         steps {
    //             sh 'mvn test'
    //               }
    //           }


    //     stage('Creating Docker Image') {
    //         steps {
    //             script {
    //                  docker.build "${registry}:v1.${BUILD_TIMESTAMP}.${BUILD_ID}"
    //                  dockerImage = docker.build"${registry}:latest"
    //             }
    //         }
    //     }

    //     stage('Deploy Image') {
    //         steps{
    //             script {
    //             docker.withRegistry( 'https://registry.dpsp.io', registryCredential ) {
    //                 dockerImage.push()
    //                 }
    //             }
    //         }
    //     }

    //     stage('Remove Unused docker image') {
    //         steps{
    //             sh "docker rmi ${registry}:v1.${BUILD_TIMESTAMP}.${BUILD_ID}"
    //             sh "docker rmi ${registry}:latest"
    //         }
    //     }


    // stage('Using Ansible to deploy a Product container in a docker machine'){
    //         steps{
    //             sshPublisher alwaysPublishFromMaster: true, publishers: [sshPublisherDesc(configName: 'ansible-server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''cd /opt/playbooks
    //                     /home/ansadmin/.local/bin/ansible-playbook -i hosts deploy_products_image.yml''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false,
    //                     patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')],
    //                     usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)]
    //         }
    //     }

    //     stage('Integration Tests') {
    //         steps {
    //             sh 'mvn clean verify -P integration-test'
    //             }
    //         }

    //         stage('Using Ansible to remove docker images'){
    //                 steps{
    //                     sshPublisher alwaysPublishFromMaster: true, publishers: [sshPublisherDesc(configName: 'ansible-server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''cd /opt/playbooks
    //                             /home/ansadmin/.local/bin/ansible-playbook -i hosts remove_docker_image.yml''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false,
    //                             patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')],
    //                             usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)]
    //                     }
    //                 }
    // }
}