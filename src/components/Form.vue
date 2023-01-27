<script lang="ts" name="Form" setup>
import { cloneDeep } from "lodash-es";
import type { PropType } from "vue";

export interface FormItem {
  field: string
  type: "input" | "checkbox" | "radio"
  prop: string
  attr?: {
    placeholder: string
  }
  value?: string | number
  children?: Array<any>
}

const props = defineProps ({
  schema: {
    type: Array as PropType<FormItem[]>,
    default: () => [],
  },
});

const emit = defineEmits(["change"]);

const rand = () => {
  return Math.random().toString(36).substring(2);
};

const model = ref<any>({
  ...cloneDeep(
    props.schema.reduce((prev, cur) => {
      prev[cur.prop] = cur.value;
      if (["radio", "checkbox"].includes(cur.type)) {
        cur.children?.forEach((o) => {
          o.id = rand();
        });
      }
      return prev;
    }, {} as Record<string, any>)
  ),
});
// const model = ref({
//  [prop]: item.value
// })

watch(
  () => model.value,
  () => {
    emit("change", model.value);
  },
  {
    deep: true,
  }
);

const clearForm = () => {
  model.value = cloneDeep(
    props.schema.reduce((prev, cur) => {
      prev[cur.prop] = cur.value;
      return prev;
    }, {} as Record<string, any>)
  );
};
defineExpose({ clearForm });
</script>

<template>
  <div v-for="(item, index) in props.schema" :key="index">
    <!-- schema(json) -> form结构 -> 动态形成form表单组件 -->
    <!-- username input -->
    <div v-if="item.type === 'input'" class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">{{ item.field }}</label>
      <input id="exampleFormControlInput1" v-model="model[item.prop]" type="username" class="form-control" :placeholder="item.attr ? item.attr.placeholder : ''">
    </div>
    <!-- role checkbox -->
    <div v-else-if="item.type === 'checkbox'" class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">{{ item.field }}</label>
      <div class="form-control border-0">
        <div v-for="(citem, cidx) in item.children" :key="cidx" class="form-check form-check-inline">
          <input :id="citem.id" v-model="model[item.prop]" class="form-check-input" type="checkbox" :value="citem.value">
          <label class="form-check-label" :for="citem.id">
            {{ citem.field }}
          </label>
        </div>
      </div>
    </div>
    <!-- gender radio -->
    <div v-else-if="item.type === 'radio'" class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">{{ item.field }}</label>
      <div class="form-control border-0">
        <div v-for="(ritem, ridx) in item.children" :key="ridx" class="form-check form-check-inline">
          <input :id="ritem.id" v-model="model[item.prop]" class="form-check-input" type="radio" name="flexRadioDefault" :value="ritem.value">
          <label class="form-check-label" :for="ritem.id">
            {{ ritem.field }}
          </label>
        </div>
      </div>
    </div>
    <!-- 扩展其他的schema组件 -->
  </div>
</template>

<style lang="scss" scoped>
</style>
