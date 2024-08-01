import fs from 'fs'
import yaml from 'js-yaml'

const members = yaml.load(fs.readFileSync('pages/members/members.yml', 'utf8')) 
// console.log(members,"ddd")
export default {
  load() {
    return members
  }
}