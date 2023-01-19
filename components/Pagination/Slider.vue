<template>
  <div class="box">
    <ul class="indicator">
      <li class="indicator__cursor"></li>
      <li
        class="indicator__item cursor-pointer"
        @click="() => onItemClick(index)"
        v-for="index in max"
        :key="index"
      ></li>
    </ul>

    <div class="info">
      <template v-if="modelValue < 10">0</template>{{ modelValue + 1 }} /
      <template v-if="max < 10">0</template>{{ max }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue: number;
  max: number;
}>();

const cursorPosition = ref(0);

onMounted(() => {
  indicatorTo(props.modelValue);
});

watch(props, () => {
  const index = props.modelValue;
  const direction = getDirection(index);

  console.log("watch", props.modelValue);
  indicatorTo(index, direction);
});

const getDirection = (number: number) =>
  number > cursorPosition.value ? "down" : "up";

const onItemClick = (number: number) => {
  const index = number - 1;
  emit("update:modelValue", index);
};

const indicatorTo = (index: number, direction: "down" | "up" = "down") => {
  //TODO: (additionally) Grab element for ref

  const cursor = ".indicator__cursor";
  const defaultCursorHeight = 30;
  const itemHeight = 35;
  const space = Math.abs(index - cursorPosition.value) + 1;

  console.log(index === cursorPosition.value);

  //Avoiding bug when user click in the same position
  if (index === cursorPosition.value) {
    return;
  }

  let cursorHeight = itemHeight + 15 * space;

  if (direction === "down") {
    gsap
      .timeline()
      .to(cursor, 0.2, {
        height: cursorHeight,
        borderRadius: `${cursorHeight / 2}px`,
      })
      .to(cursor, 0.2, {
        y: index * itemHeight,
        height: defaultCursorHeight,
      });
  }
  if (direction === "up") {
    gsap
      .timeline()
      .to(cursor, 0.2, {
        y: index * itemHeight,
        height: cursorHeight,
        borderRadius: `${cursorHeight / 2}px`,
      })
      .to(cursor, 0.2, {
        y: index * itemHeight,
        height: defaultCursorHeight,
      });
  }

  cursorPosition.value = index;
};
</script>

<style scoped lang="scss">
.info {
  writing-mode: vertical-rl;
}

.box {
  position: fixed;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
}

.indicator {
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 100;
  pointer-events: none;
  &__item {
    width: 20px;
    height: 20px;
    background-color: theme("colors.primary.700");
    border: 2px solid theme("colors.primary.500");
    border-radius: 100%;
    margin-bottom: 15px;
    pointer-events: visible;
    // transition: transform .3s ease-in;
    // &:hover{
    //   transform: scale(1.3);
    // }
  }
  &__cursor {
    width: 30px;
    height: 30px;
    background-color: theme("colors.accent.500");
    border-radius: 100%;
    position: absolute;
    z-index: -1;
    left: -5px;
    top: -5px;
  }

  @media screen and (min-width: 768px) {
    right: 20px;
  }
}
</style>
