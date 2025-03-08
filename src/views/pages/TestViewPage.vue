<script setup>
import {h, ref, watchEffect} from "vue";
import {NDataTable, NPagination, NInput, NSelect, NButton} from "naive-ui";
import axios from "axios";

// Table columns
const columns = [
  {
    title: "Jenis",
    key: "type",
    sorter: "default",
  },
  {
    title: "No Kontrak",
    key: "order_number",
    sorter: "default",
  },
  {
    title: "Stts Kontrak",
    key: "status_kontrak",
    sorter: "default",
  },
  {
    title: "Nama Debitur",
    key: "nama_debitur",
    sorter: "default",
  },
  {
    title: "Asal Jaminan",
    key: "asal_lokasi",
    sorter: "default",
  },
  {
    title: "Lokasi Jaminan",
    key: "lokasi",
    sorter: "default",
  },
  {
    title: "Status",
    key: "status_jaminan",
    sorter: "default",
  },
  {
    width: 100,
    align: "right",
    key: "action",
    render(row) {
      return h(
          NButton,
          {
            size: "small",
            secondary: true,
            round: true,
            onClick: () => {
              handleAction(row);
            },
          },
          {
            default: () => "detail",
          }
      );
    },
  },
];

// Reactive state
const users = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const searchQuery = ref(""); // Search input
const selectedRole = ref(""); // Role filter
const sortBy = ref("name");
const order = ref("asc");

// Fetch users with query parameters
const fetchUsers = async () => {
  try {
    const response = await axios.get("https://dev.kspdjaya.id/jaminan", {
      params: {
        type:"onGoing",
        page: currentPage.value,
        search: searchQuery.value,
        sort_by: sortBy.value,
        order: order.value
      }, headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` // Send token in header
      }
    });
    users.value = response.data.data;
    totalItems.value = response.data.total;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Watch for changes & fetch new data
watchEffect(() => {
  fetchUsers();
});
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <!-- Search and Filter -->
    <n-input v-model:value="searchQuery" placeholder="cari disini..." @input="fetchUsers" />

    <!-- Data Table -->
    <n-data-table :columns="columns" :data="users" :bordered="true" />

    <!-- Pagination -->
    <n-pagination
        v-model:page="currentPage"
        :page-size="pageSize"
        :item-count="totalItems"
        show-quick-jumper
        @update:page="fetchUsers"
    />
  </div>
</template>
