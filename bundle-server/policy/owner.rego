package owner
import data.datasets # // import datasets from data.json

default allow = false

# // check if the user is the owner of the dataset
allow {
    user := input.subject.id
    dataset := datasets[_]
    dataset.owner == user
    dataset.id == input.resource.id
}