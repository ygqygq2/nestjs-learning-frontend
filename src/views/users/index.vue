<script setup lang="ts" name="users">
import { getAllUsers } from "@/api/user";

import type { FormItem } from "@/components/Form.vue";
import DeleteModal from "@/components/modal/DeleteModal.vue";
import EditAddModal from "@/components/modal/EditAddModal.vue";
import axios from "@/utils/axios";

interface Profile {
  gender: number
  address: string
  photo: string
}

interface RoleItem {
  id: number
  name: string
}

interface UserItem {
  id: number
  username: string
  password?: string
  profile: Profile
  roles: RoleItem[]
}

const lists = ref([] as UserItem[]);
const tmpItem = ref({} as UserItem);

const formSchema = [
  {
    field: "用户名",
    type: "input",
    prop: "username",
    value: "",
    attr: {
      placeholder: "请输入用户名",
    },
  },
  {
    field: "密码",
    type: "input",
    prop: "password",
    value: "",
    attr: {
      placeholder: "请输入登录密码",
    },
  },
  {
    field: "角色",
    type: "checkbox",
    prop: "roles",
    value: [],
    children: [
      {
        value: 1,
        field: "普通用户",
      },
      {
        value: 2,
        field: "管理员",
      },
      {
        value: 3,
        field: "测试用户",
      },
    ],
  },
  {
    field: "性别",
    type: "radio",
    prop: "gender",
    value: 0,
    children: [
      {
        value: 1,
        field: "男",
      },
      {
        value: 2,
        field: "女",
      },
    ],
  },
  {
    field: "头像",
    type: "input",
    prop: "photo",
    value: "",
    attr: {
      placeholder: "请输入头像链接",
    },
  },
  {
    field: "地址",
    type: "input",
    prop: "address",
    value: "",
    attr: {
      placeholder: "请输入地址",
    },
  },
] as FormItem[];

const deleteShow = ref(false);
const editShow = ref(false);

let formValue = reactive({
  username: "",
  password: "",
  profile: {
    gender: 0,
    address: "",
    photo: "",
  } as Profile,
  roles: [] as RoleItem[],
} as UserItem);

let localType = "";

// 模态框的控制 handler
const msg = ref("新增");

// 获取数据
const getData = async () => {
  const res = (await getAllUsers()) as unknown as UserItem[];
  if (res && res.length > 0) {
    lists.value = res;
  }
};

onMounted(async () => {
  // 初始化
  await getData();
});

// 控制模态框
const openModal = (type: string, item?: UserItem) => {
  localType = type;
  tmpItem.value = item || ({} as UserItem);
  // form 表单数据
  // Object.assign(formValue, item);
  if (type === "delete") {
    deleteShow.value = true;
  } else if (type === "edit") {
    msg.value = "编辑";
    editShow.value = true;
  } else if (type === "add") {
    msg.value = "新增";
    editShow.value = true;
  }
};

const editSubmit = async (val: any) => {
  formValue = val;
  // 判断用户是新增还是编辑
  if (localType === "add") {
    // 发送对应的数据到接口
    const res = await axios.post("/user", formValue);
    console.log("🚀 ~ file: index.vue~ line 238~ editSubmit~ res", res);
    // 清空 form 表单
    Object.assign(formValue, {
      username: "",
      password: "",
      profile: {
        gender: 0,
        address: "",
        photo: "",
      } as Profile,
      roles: [] as RoleItem[],
    });
    // 关闭模态框
    editShow.value = false;
  }
  /*
  * 编辑的时候—> 保存 id 信息 -> 传参把 id 代上
  * 编辑之前填充数据到 form 表单上 -> formValue -> mapper -> roles id
  */
  if (localType === "edit") {
    // 1. 获取用户编辑的 item -> id
    const id = tmpItem.value.id;
    // 2. 发送编辑请求
    console.log("🚀 ~ file: index.vue:186~ editSubmit~ formValue", formValue);
    const res = (await axios.put(`/user/${id}`, formValue)) as UserItem;
    // 3. 请求成功之后关闭模态框
    console.log("🚀 ~ file: index.vue:185~ editSubmit~ res", res);
    if (res.username === tmpItem.value.username) {
      editShow.value = false;
    }
  }
};

// 删除该条数据
const deleteSubmit = async () => {
  // 1. 获取用户删除的 item -> id
  const id = tmpItem.value.id;
  // 2. 发送删除请求
  const res = (await axios.delete(`/user/${id}`)) as UserItem;
  // 3. 请求成功之后关闭模态框
  console.log("🚀 ~ file: index.vue~ line 272~ deleteSubmit~ res", res);
  if (res.username === tmpItem.value.username) {
    deleteShow.value = false;
  }
  // 获取新的列表数据并更新
  await getData();
};
</script>

<template>
  <div>
    <div class="mb-3">
      <button type="button" class="btn btn-primary px-3" @click="openModal('add')">
        <i class="fas fa-plus" />新增
      </button>
    </div>
    <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            用户名
          </th>
          <th scope="col">
            角色
          </th>
          <th scope="col">
            性别
          </th>
          <th scope="col">
            头像
          </th>
          <th scope="col">
            地址
          </th>
          <th scope="col">
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lists" :key="item.id">
          <th scope="row">
            {{ index + 1 }}
          </th>
          <td>{{ item.username }}</td>
          <td>{{ item.roles.map(o => o.name).join(',') }}</td>
          <td>{{ item.profile && item.profile.gender }}</td>
          <td>{{ item.profile && item.profile.photo }}</td>
          <td>{{ item.profile && item.profile.address }}</td>
          <td>
            <button type="button" class="btn btn-secondary px-3" @click="openModal('edit', item)">
              <i class="far fa-edit me-2" />编辑
            </button>
            <button type="button" class="btn btn-danger px-3 ms-3" @click="openModal('delete', item)">
              <i class="far fa-trash-alt me-2" />删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#">Previous</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>

    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#DeleteModal">
      Launch demo modal
    </button> -->

    <DeleteModal v-model:show="deleteShow" @delete="deleteSubmit" />
    <EditAddModal v-model:show="editShow" :schema="formSchema" :msg="msg" @submit="editSubmit" />
  </div>
</template>

<style lang="scss" scoped>

</style>
