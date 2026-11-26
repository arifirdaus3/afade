import { describe, expect, it } from 'vitest'
import {
  getReleaseNotesUrlForVersion,
  getReleaseRepoForChannel,
  RELEASE_CHANNELS
} from './release-channel'

describe('fork update source', () => {
  it('keeps every release channel and release notes on the fork', () => {
    for (const channel of RELEASE_CHANNELS) {
      expect(getReleaseRepoForChannel(channel)).toBe('arifirdaus3/afade')
    }
    expect(getReleaseNotesUrlForVersion('1.4.0')).toBe(
      'https://github.com/arifirdaus3/afade/releases/tag/v1.4.0'
    )
  })
})
