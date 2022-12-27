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
      <template v-if="page < 10">0</template>{{ page + 1 }} /
      <template v-if="max < 10">0</template>{{ max }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

const props = defineProps<{
  page: number;
  max: number;
}>();

const cursorPosition = ref(props.page);

onMounted(() => {
  indicatorTo(cursorPosition.value);
});

watch(props, () => {
  const index = props.page;
  const direction = getDirection(index);

  indicatorTo(index, direction);
  cursorPosition.value = index;
});

const getDirection = (number: number) =>
  number > cursorPosition.value ? "down" : "up";

const onItemClick = (number: number) => {
  const index = number - 1;
  const direction = getDirection(number);

  indicatorTo(index, direction);
  cursorPosition.value = index;
};

const indicatorTo = (index: number, direction: "down" | "up" = "down") => {
  //TODO: (additionally) Grab element for ref

  const cursor = ".indicator__cursor";
  const defaultCursorHeight = 30;
  const itemHeight = 35;

  let cursorHeight = itemHeight + 15 * 2;

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
    background-color: #fff;
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
