<template>
        <n-space vertical :size="12" class="pt-4">
                <n-data-table size="small" :columns="columns" :data="data" :pagination="pagination" />
        </n-space>
</template>

<script setup>
import { h, defineComponent } from "vue";
import { NIcon, NTag, NButton, NDropdown, useMessage } from "naive-ui";
import {
        EditOutlined as EditIcon,
        DeleteOutlined as DeleteIcon,
        MoreVertRound as MoreIcon,
        ListAltOutlined as DetailIcon
} from "@vicons/material";
const renderIcon = (icon) => {
        return () => {
                return h(NIcon, null, {
                        default: () => h(icon)
                });
        };
};
const columns = [
        {
                title: "Name",
                key: "name"
        },
        {
                title: "Age",
                key: "age"
        },
        {
                title: "Address",
                key: "address"
        }, {
                title: "",
                align: "right",
                key: "more",
                render(row) {
                        return h(
                                NDropdown,
                                {
                                        options: options,
                                        size: "small",
                                        onSelect: (row) => handleSelect(row),
                                },
                                { default: renderIcon(MoreIcon) }
                        );
                }
        }
];
const options = [
        {
                label: "Edit",
                key: "edit",
                icon: renderIcon(EditIcon),
        },
        {
                label: "Hapus",
                key: "hapus",
                icon: renderIcon(DeleteIcon)
        },
        {
                label: "Detail",
                key: "detail",
                icon: renderIcon(DetailIcon)
        }
];
const handleSelect = (row) => {
        console.log(row);
}
const data = [
        {
                key: 0,
                name: "John Brown",
                age: 32,
                address: "New York No. 1 Lake Park",
                tags: ["nice", "developer"]
        },
        {
                key: 1,
                name: "Jim Green",
                age: 42,
                address: "London No. 1 Lake Park",
                tags: ["wow"]
        },
        {
                key: 2,
                name: "Joe Black",
                age: 32,
                address: "Sidney No. 1 Lake Park",
                tags: ["cool", "teacher"]
        }
];
const sendMail = (e) => {
        console.log(e);
}
const pagination = {
        pageSize: 10
}
// const createColumns = ({
//         sendMail
// }) => {
//         return [
//                 {
//                         title: "Name",
//                         key: "name"
//                 },
//                 {
//                         title: "Age",
//                         key: "age"
//                 },
//                 {
//                         title: "Address",
//                         key: "address"
//                 },
//                 {
//                         title: "Tags",
//                         key: "tags",
//                         render(row) {
//                                 const tags = row.tags.map((tagKey) => {
//                                         return h(
//                                                 NTag,
//                                                 {
//                                                         style: {
//                                                                 marginRight: "6px"
//                                                         },
//                                                         type: "info",
//                                                         bordered: false
//                                                 },
//                                                 {
//                                                         default: () => tagKey
//                                                 }
//                                         );
//                                 });
//                                 return tags;
//                         }
//                 },
//                 {
//                         title: "Action",
//                         key: "actions",
//                         render(row) {
//                                 return h(
//                                         NButton,
//                                         {
//                                                 size: "small",
//                                                 onClick: () => sendMail(row)
//                                         },
//                                         { default: () => "Send Email" }
//                                 );
//                         }
//                 }
//         ];
// };

// const createData = () => [
//         {
//                 key: 0,
//                 name: "John Brown",
//                 age: 32,
//                 address: "New York No. 1 Lake Park",
//                 tags: ["nice", "developer"]
//         },
//         {
//                 key: 1,
//                 name: "Jim Green",
//                 age: 42,
//                 address: "London No. 1 Lake Park",
//                 tags: ["wow"]
//         },
//         {
//                 key: 2,
//                 name: "Joe Black",
//                 age: 32,
//                 address: "Sidney No. 1 Lake Park",
//                 tags: ["cool", "teacher"]
//         }
// ];

// export default defineComponent({
//         setup() {
//                 const message = useMessage();
//                 return {
//                         data: createData(),
//                         columns: createColumns({
//                                 sendMail(rowData) {
//                                         message.info("send mail to " + rowData.name);
//                                 }
//                         }),
//                         pagination: {
//                                 pageSize: 10
//                         }
//                 };
//         }
// });
</script>