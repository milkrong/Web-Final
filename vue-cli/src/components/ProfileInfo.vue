<template>
    <div class="profile-info-content">
        <h3>{{userData.name}}</h3>
        <span>@{{userData.username}}</span>
        <p>{{userData.motto}}</p>
    </div>
</template>

<script>
    export default {
      name: 'profile-info',
      props: ['userData']
    }
</script>

<style>
.profile-info-content span {
    color: #888888;
    display: block;
    font-size: 14px;
    margin-bottom: 3px;
}
</style>

