import fs from 'fs'
import yaml from 'js-yaml'


export default {
  async paths() {
    const members = yaml.load(fs.readFileSync('pages/members/members.yml', 'utf8'))

    return Object.keys(members).map((member) => {
      return {
        params: { member }
      }
    })
  }
}