# Changelog

## [1.0.0] - 2025-01-19

### 🎉 Major Release - Svelte 5 Support

**Breaking Changes:**
- **Requires Svelte 5.0.0+** - This version only works with Svelte 5
- Migrated to Svelte 5 runes mode (`$state`, `$derived`, `$effect`, `$bindable`, `$props()`)
- Event handlers changed from `on:event` to `onevent` syntax

**New Features:**
- ✅ Full Svelte 5 runes mode support
- ✅ Improved reactivity and performance
- ✅ Comprehensive test suite with 100% passing tests
- ✅ Better focus management and input handling

**Improvements:**
- Fixed automatic focus shift between inputs when typing
- Fixed paste functionality with proper focus positioning
- Enhanced state management using Svelte 5 patterns
- Added null safety checks throughout
- Improved input value synchronization

**Dependencies Updated:**
- Svelte: 4.x → 5.15.0
- SvelteKit: 2.0.0 → 2.47.1
- All dev dependencies updated to latest versions

**Migration Guide:**
If you're upgrading from v0.1.x (Svelte 4), you'll need to:
1. Upgrade your project to Svelte 5
2. Update to `svelte-num-otp@1.0.0`
3. No API changes - the component interface remains the same!

**For Svelte 4 Users:**
- Continue using `svelte-num-otp@0.1.5`
- Note: v0.1.x is now deprecated and will not receive updates

---

## [0.1.5] - Previous Release

Last version supporting Svelte 4 (deprecated)
