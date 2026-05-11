import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * 📋 TODO: User Repository 함수들을 구현해주세요!
 *
 * 04-crud 폴더의 완성된 코드를 참고하여 아래 함수들을 구현하세요.
 * function 키워드로 선언 후 객체로 묶어서 export 하는 방식을 사용합니다.
 */

// 새 사용자 생성
async function createUser(data) {
  // TODO: prisma.user.create()를 사용하여 새 사용자를 생성하세요
  // 힌트: return await prisma.user.create({ data });

  throw new Error('createUser 함수를 구현해주세요!');
}

// 모든 사용자 조회
async function findAllUsers() {
  // TODO: prisma.user.findMany()를 사용하여 모든 사용자를 조회하세요
  // 힌트: return await prisma.user.findMany;

  throw new Error('findAllUsers 함수를 구현해주세요!');
}

// ID로 특정 사용자 조회
async function findUserById(id) {
  // TODO: prisma.user.findUnique()를 사용하여 특정 사용자를 조회하세요
  // 힌트: return await prisma.user.findUnique

  throw new Error('findUserById 함수를 구현해주세요!');
}

// 사용자 정보 수정
async function updateUser(id, data) {
  // TODO: prisma.user.update()를 사용하여 사용자 정보를 수정하세요
  // 힌트: return await prisma.user.update

  throw new Error('updateUser 함수를 구현해주세요!');
}

// 사용자 삭제
async function deleteUser(id) {
  // TODO: prisma.user.delete()를 사용하여 사용자를 삭제하세요
  // 힌트: return await prisma.user.delete

  throw new Error('deleteUser 함수를 구현해주세요!');
}

// 객체로 묶어서 export
export const userRepository = {
  createUser,
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser,
};

/**
 * 🎯 구현 완료 후 체크리스트:
 *
 * □ createUser: email, name을 받아서 새 사용자 생성
 * □ findAllUsers: 모든 사용자를 배열로 반환
 * □ findUserById: ID로 특정 사용자 조회 (없으면 null 반환)
 * □ updateUser: ID와 수정할 데이터를 받아서 사용자 정보 업데이트
 * □ deleteUser: ID로 사용자 삭제
 *
 * 💡 테스트 방법:
 * 1. 먼저 한 함수씩 구현하세요
 * 2. routes/users.js에서 해당 함수를 사용하세요
 * 3. API 테스트 도구로 동작을 확인하세요
 */
