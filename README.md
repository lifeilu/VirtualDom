# 实现虚拟Dom
实现虚拟Dom以及核心的diff和patch方法，主要包括：
- Element
- diff
- patch
其中，类Element表示虚拟Dom的对象，diff用来对比虚拟Dom的变化，patch用来将变化的补丁更新上去。