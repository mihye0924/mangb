import fs from 'fs'
import yaml from 'js-yaml'

const members = yaml.load(fs.readFileSync('pages/members/members.yml', 'utf8'))  

export default {
  load() {
    return members
  }
}