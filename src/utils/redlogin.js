
export function islogin(url,vm){
    console.log(vm.$store.state.userinfo)
    if(vm.$store.state.userinfo){
        console.log(vm.$store.state)
        vm.$router.push(`/${url}`)
    }else{
        vm.$router.push(`/login?redirect=${url}`)
    }
}