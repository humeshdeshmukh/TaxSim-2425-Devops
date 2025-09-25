output "container_name" {
  value = docker_container.taxsim.name
}
output "container_ip" {
  value = docker_container.taxsim.network_data[0].ip_address
}
