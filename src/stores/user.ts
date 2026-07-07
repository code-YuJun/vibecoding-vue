import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface UserInfo {
    id: number
    name: string
    avatar: string
    role: string
}

export const useUserStore = defineStore('user', () => {
    const token = ref('')
    const userInfo = ref<UserInfo | null>(null)

    const isLogin = computed(() => !!token.value)
    const userName = computed(() => userInfo.value?.name || '')

    function login(newToken: string, info: UserInfo) {
        token.value = newToken
        userInfo.value = info
    }

    function logout() {
        token.value = ''
        userInfo.value = null
    }

    function updateUserInfo(info: Partial<UserInfo>) {
        if (userInfo.value) {
            userInfo.value = { ...userInfo.value, ...info }
        }
    }

    return {
        token,
        userInfo,
        isLogin,
        userName,
        login,
        logout,
        updateUserInfo
    }
})