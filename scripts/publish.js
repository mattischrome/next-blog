// Invoke with node ./scripts/publish.js from blog root
// This script presents the user with a list of files in data/blog/drafts
// Selected post will
// 1. have its frontmatter draft key set to true
// 2. be moved into the parent directory (/data/blog)

// Edge cases
// 1. Empty drafts directory - this is handled by inquirer I guess
// 2. No draft key in the YAML - regex can't replace what it doesn't find
// 3. No YAML full stop (what if we've just dropped a plain .txt file in the drafts folder?) - see 2, guess this would just bork the deployment

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const replace = require('replace')

const root = process.cwd()

const getDrafts = () => {
    const draftPath = path.join(root, 'data', 'blog', 'drafts')
    const draftList = fs.readdirSync(draftPath).map((filename) => path.parse(filename).base)
    return draftList
}

inquirer
    .prompt([
        {
            name: 'selectedDraft',
            message: 'Choose a draft to promote to published status:',
            type: 'list',
            choices: getDrafts,
        },
    ])
    .then((answers) => {
        // Perform actions that publish the post
        const old_path = path.join(root, 'data', 'blog', 'drafts', answers.selectedDraft)
        const new_path = path.join(root, 'data', 'blog', answers.selectedDraft)
        fs.rename(old_path,new_path,((err) => {
            if(err){
                return console.error(err)
            } else {
                console.log("Success!")
            }
        }))
        replace({
            regex: 'draft: true',
            replacement: 'draft: false',
            paths: [new_path],
            recursive: true,
            silent: true,
        })
    })
    .catch((error) => {
        if(error.isTtyError) {
            console.log("Prompt could not be rendered in the current environment")
        } else {
            console.log("Something went wrong, sorry!")
        }
    })