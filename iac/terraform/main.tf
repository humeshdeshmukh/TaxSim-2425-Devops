# devops/iac/terraform/main.tf
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "taxsim" {
  name         = "humesh/taxsim:latest"
  build {
    context    = "../.."
    dockerfile = "devops/docker/Dockerfile"
  }
}

resource "docker_container" "taxsim" {
  name  = "taxsim"
  image = docker_image.taxsim.latest
  ports {
    internal = 3000
    external = 3000
  }
}
