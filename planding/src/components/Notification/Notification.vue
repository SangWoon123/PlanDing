<template>
  <v-menu :location="location">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" dark v-bind="props"> Dropdown </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup></script>

<style lang="scss" scoped></style>
