# Cloud-Automated Deployment System for Scalable Web Apps

A cloud-native DevOps project that automates the deployment of web applications using Jenkins, Docker, and AWS EC2. The system integrates GitHub for source control, builds Docker containers, deploys them to the cloud, and notifies stakeholders via Slack. A React.js-based dashboard offers real-time visibility into the deployment process.

---

## 🚀 Project Objective

To design and implement an automated, reliable, and scalable CI/CD pipeline for modern web applications—ensuring fast, error-free deployments and complete visibility into build and runtime status.

---

## 🛠️ Built With

- **Source Control:** Git, GitHub  
- **CI/CD Tools:** Jenkins, Jenkins Pipeline  
- **Containerization:** Docker  
- **Cloud Infrastructure:** AWS EC2, AWS CLI  
- **Notifications:** Slack Webhooks, Slack Jenkins Plugin  
- **Frontend (Dashboard):** React.js, Tailwind CSS, HTML, JavaScript  
- **Backend:** Node.js, Flask  
- **Monitoring:** Prometheus, Grafana  
- **Container Orchestration:** Kubernetes, AWS EKS  

---

## 📦 Key Features

- Continuous integration and deployment using Jenkins Pipelines  
- Builds and runs Docker containers from GitHub source code  
- Deploys the application on AWS EC2 instances  
- Sends real-time deployment notifications to Slack  
- React dashboard to display build history, deployment status, and system metrics  
- Modular and extensible design for future enhancements like monitoring and scaling  

---

## 📘 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/srinukongani15/Cloud-Automated-Deployment-System-for-Scalable-Web-Apps.git
cd Cloud-Automated-Deployment-System-for-Scalable-Web-Apps
2. Set Up AWS EC2 Instance
Launch an Ubuntu EC2 instance

Open ports: 22 (SSH), 8080 (Jenkins), 80 (App access)

SSH into the instance and install Docker and Jenkins

3. Install Required Tools
bash
Copy
Edit
# Docker
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

# Jenkins
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install openjdk-11-jdk jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins
4. Configure Jenkins
Open Jenkins in a browser: http://<your-ec2-ip>:8080

Complete setup and install necessary plugins:

Git Plugin

Docker Pipeline

Slack Notification Plugin

Create a new Pipeline Job and configure GitHub integration

5. Jenkins Pipeline Script (Jenkinsfile)
groovy
Copy
Edit
pipeline {
  agent any
  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/srinukongani15/Cloud-Automated-Deployment-System-for-Scalable-Web-Apps.git'
      }
    }
    stage('Build Image') {
      steps {
        script {
          docker.build('app-image')
        }
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker stop app || true'
        sh 'docker rm app || true'
        sh 'docker run -d -p 80:3000 --name app app-image'
      }
    }
    stage('Notify') {
      steps {
        slackSend(channel: '#deployments', message: 'Deployment Successful 🚀')
      }
    }
  }
}
6. Slack Integration
Create a Slack App and enable Incoming Webhooks

Add the webhook URL to Jenkins:
Manage Jenkins → Configure System → Slack Notification

Use slackSend in your Jenkinsfile to post deployment updates

📊 Deployment Dashboard
A responsive React.js dashboard is available to:

Monitor pipeline status in real-time

View recent build history

Access live logs and system resource metrics

Trigger actions like restart or redeploy

Run Locally
bash
Copy
Edit
npm install
npm run dev
🔮 Future Scope
Integrate Prometheus and Grafana for in-depth monitoring

Use Kubernetes (EKS) for auto-scaling and orchestration

Enable AWS Load Balancer for traffic distribution

Implement secret management and access control policies

✅ Final Deliverables
Complete source code in GitHub

Dockerized web application deployed on AWS EC2

Functional CI/CD pipeline with real-time Slack notifications

Deployment status dashboard built with React

Fully documented setup and pipeline configuration

🧠 Conclusion
This project is a practical demonstration of DevOps principles and cloud infrastructure automation. It provides a scalable and maintainable CI/CD architecture that simplifies deployment workflows and enhances visibility. Ideal for production-ready startups or team-based development environments.

👤 Author
Kongani Srinu
GitHub: @srinukongani15
Email: 2100039108cse.r@gmail.com
