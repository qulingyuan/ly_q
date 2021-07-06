

#### git更改远端和本地分支名称

```apl
git branch -m old_branch new_branch # Rename branch locally
git push origin :old_branch # Delete the old branch
git push --set-upstream origin new_branch # Push the new branch, set local branch to track the new remote
```

