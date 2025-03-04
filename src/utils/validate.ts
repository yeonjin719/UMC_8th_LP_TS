import { z } from 'zod';

// 이름 스키마
const nameSchema = z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(20, '이름은 최대 20자 이하여야 합니다.');

// 이메일 스키마
const emailSchema = z.string().email('올바른 이메일 형식을 입력해주세요.');

// 비밀번호 스키마
const passwordSchema = z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.');

const avartarSchema = z.string().nullable();
const bioSchema = z.string().nullable();

// 비밀번호와 비밀번호 확인을 비교하는 스키마
const passwordGroupSchema = z
    .object({
        password: passwordSchema,
        passwordCheck: passwordSchema,
    })
    .refine((data) => data.password === data.passwordCheck, {
        message: '비밀번호가 일치하지 않습니다',
        path: ['passwordCheck'], // 오류가 'passwordCheck' 필드에 발생합니다.
    });

// 회원가입 폼 스키마
const signUpSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    passwordGroup: passwordGroupSchema,
    avatar: avartarSchema,
    bio: bioSchema,
});

const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

const addLpSchema = z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
});

const editProfileSchema = z.object({
    avatar: z.string().url().nullable(),
    bio: z.string().nullable(),
    name: z.string().min(1).nonempty(),
});

export { signUpSchema, addLpSchema, loginSchema, editProfileSchema };
