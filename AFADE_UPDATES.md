# Afade upstream updates

Afade is experimental: it still shares `~/.orca` agent hooks and configuration with Orca. Do not run it alongside an official Orca installation until those resources are isolated. Windows builds are unsigned. The fork does not register `orca://` links or use Orca's uninstall cleanup hooks. These builds do not include the optional `orcad` template used for remote runtime distribution.

The Afade upstream workflow checks the latest stable Orca release daily (03:19 Jakarta time) and can also be started from Actions using **Run workflow**. It runs only in `arifirdaus3/afade`. It merges the release into the fork's default branch in a temporary checkout, then runs `pnpm check:changed` and builds a Windows installer. If those steps pass, it publishes the installer and `latest.yml` as a GitHub release in Afade. The packaged app checks that repository for updates; set **Settings → General → About → Automatic updates** to enable automatic download and install. A merge conflict, failed check, or failed build stops the run.

On success, the Windows installer is available from the Afade GitHub Releases page and the app updater can install it. The `afade-candidate-<tag>` Actions artifact contains build information, a change summary, and a Git bundle with the exact merge commit used for that release. Artifacts expire after 14 days.

To inspect a downloaded candidate in the local fork, replace the example path with the actual bundle path:

```powershell
git fetch C:/Downloads/afade-review/candidate.bundle refs/heads/afade-candidate:refs/remotes/afade/candidate
git log --oneline --graph main..afade/candidate
git diff main afade/candidate
```

The bundle requires the fork commit named as `Base` in `build-info.txt` to be present locally. After review, `git merge --ff-only afade/candidate` incorporates the tested commit only if the current branch has not moved since the build; otherwise, merge the upstream release again and rerun the checks. Push the accepted branch yourself. The workflow does not push commits or create pull requests.

The first run requires this workflow file to be committed and pushed to the fork's default branch, GitHub Actions to be enabled, and the repository's Actions setting **Workflow permissions** to allow read and write access (the workflow needs `contents: write` to publish releases). Scheduled workflows may be suspended by GitHub after repository inactivity; check the Actions page if runs stop.
